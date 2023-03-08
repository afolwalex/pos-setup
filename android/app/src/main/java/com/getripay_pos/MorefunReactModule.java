package com.getripay_pos;
import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;
import android.os.Bundle;

import com.getripay_pos.utils.EmvUtil;
import com.morefun.yapi.device.printer.PrinterConfig;
import com.morefun.yapi.device.reader.icc.IccCardReader;
import com.morefun.yapi.device.reader.icc.IccCardType;
import com.morefun.yapi.device.reader.icc.IccReaderSlot;
import com.morefun.yapi.device.reader.icc.OnSearchIccCardListener;
import com.morefun.yapi.emv.OnEmvProcessListener;
import com.morefun.yapi.engine.DeviceInfoConstrants;
import android.os.RemoteException;
import android.view.Gravity;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.morefun.yapi.ServiceResult;
import com.morefun.yapi.device.reader.mag.MagCardInfoEntity;
import com.morefun.yapi.device.reader.mag.MagCardReader;
import com.morefun.yapi.device.reader.mag.OnSearchMagCardListener;
import com.morefun.yapi.device.printer.FontFamily;
import com.morefun.yapi.device.printer.MulPrintStrEntity;
import com.morefun.yapi.device.printer.OnPrintListener;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.ArrayList;


public class MorefunReactModule extends ReactContextBaseJavaModule {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    public Context myContext;

    public MorefunReactModule(ReactApplicationContext reactContext) {

        super(reactContext);

        myContext = reactContext;
    }

    @Override
    public String getName() {
        return "MorefunReactModule";
    }

    @ReactMethod
    public void getDeviceInfo(Promise promise) {
        Log.d("TAG", "###getDeviceInfo>>>");
        try {
            Bundle devInfo = DeviceHelper.getDeviceService().getDevInfo();
            String vendor = devInfo.getString(DeviceInfoConstrants.COMMOM_VENDOR);
            String model = devInfo.getString(DeviceInfoConstrants.COMMOM_MODEL);
            String osVer = devInfo.getString(DeviceInfoConstrants.COMMOM_OS_VER);
            String sn = devInfo.getString(DeviceInfoConstrants.COMMOM_SN);
            String tusn = devInfo.getString(DeviceInfoConstrants.TID_SN);
            String versionCode = devInfo.getString(DeviceInfoConstrants.COMMON_SERVICE_VER);
            String hardware = devInfo.getString("hardware");
            
            JSONObject json = new JSONObject();
            json.put("vendor", vendor);
            json.put("model", model);
            json.put("osVer", osVer);
            json.put("sn", sn);
            json.put("tusn", tusn);
            json.put("versionCode", versionCode);
            json.put("hardware", hardware);
            promise.resolve(json.toString());
        } catch (RemoteException e) {
            promise.reject(e);
        } catch (JSONException e) {
            e.printStackTrace();
            promise.reject(e);
		}
    }

    @ReactMethod
    public void readMagCard(Promise promise) {
        Log.d("TAG", "###readMagCard>>>");
        try {
            final MagCardReader magCardReader = DeviceHelper.getMagCardReader();

            magCardReader.searchCard(new OnSearchMagCardListener.Stub() {
                @Override
                public void onSearchResult(int ret, MagCardInfoEntity magCardInfoEntity) throws RemoteException {
                    try {
                        if (ret == ServiceResult.Success) {
                            JSONObject json = new JSONObject();
                            json.put("cardNo", magCardInfoEntity.getCardNo());
                            json.put("track1", magCardInfoEntity.getTk1());
                            json.put("track2", magCardInfoEntity.getTk2());
                            json.put("track3", magCardInfoEntity.getTk3());
                            json.put("nServiceCode", magCardInfoEntity.getServiceCode());
                            promise.resolve(json.toString());
                        } else {
                            promise.reject(ret + "");
                        }
                    } catch(JSONException e) {
                        promise.reject(e);
                    }
                }
            }, 10, new Bundle());
        } catch (RemoteException e) {
            e.printStackTrace();
            promise.reject(e);
        } 
    }

    @ReactMethod
    public void print(ReadableArray printData, Promise promise) {
        Log.d("TAG", "###print>>>");
        try {
            List<MulPrintStrEntity> list = new ArrayList<>();
            int fontSize = FontFamily.MIDDLE;
            Bundle config = new Bundle();
            config.putInt(PrinterConfig.COMMON_GRAYLEVEL, 70);

            MulPrintStrEntity entity = new MulPrintStrEntity("Customer Copy", fontSize);
            Bitmap imageFromAssetsFile = getImageFromAssetsFile(this, "logo.bmp");
            entity.setBitmap(imageFromAssetsFile);
            entity.setMarginX(50);
            entity.setGravity(Gravity.CENTER);
            entity.setUnderline(true);
            entity.setYspace(30);
            list.add(entity);

            JSONObject json = new JSONObject();

            if (printData != null && printData.size() > 0) {
                for (int i = 0; i < printData.size(); i++) {
                    list.add(new MulPrintStrEntity(printData.getString(i), fontSize));
                }
            }
            
            DeviceHelper.getPrinter().printStr(list, new OnPrintListener.Stub() {
                @Override
                public void onPrintResult(int result) throws RemoteException {
                    try {
                        json.put("Completed", "Yes");
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    promise.resolve(json.toString());
                }
            }, config);
        } catch (RemoteException e) {
            e.printStackTrace();
            promise.reject(e);
        }
    }

    @ReactMethod
    public void readIcCard(String amount, Promise promise) {
        Log.d("TAG", "###ReadIcCard>>>");

        try{
            final IccCardReader iccCardReader = DeviceHelper.getIccCardReader(IccReaderSlot.ICSlOT1);
            final IccCardReader rfReader = DeviceHelper.getIccCardReader(IccReaderSlot.RFSlOT);

            JSONObject json = new JSONObject();

            OnSearchIccCardListener.Stub listener = new OnSearchIccCardListener.Stub() {
                @Override
                public void onSearchResult(int i, Bundle bundle) throws RemoteException {
                    DeviceHelper.getEmvHandler().emvTrans(EmvUtil.getTransBundle(amount, "0.01"), new OnEmvProcessListener.Stub() {
                        @Override
                        public void onSelApp(List<String> list, boolean b) throws RemoteException {

                        }

                        @Override
                        public void onConfirmCardNo(String s) throws RemoteException {
                            try {
                                json.put("CardNo", s);
                                promise.resolve(json.toString());

                            } catch (JSONException e) {
                                e.printStackTrace();
                                promise.reject(e);
                            }
                        }

                        @Override
                        public void onCardHolderInputPin(boolean b, int i) throws RemoteException {

                        }

                        @Override
                        public void onPinPress(byte b) throws RemoteException {

                        }

                        @Override
                        public void onCertVerify(String s, String s1) throws RemoteException {

                        }

                        @Override
                        public void onOnlineProc(Bundle bundle) throws RemoteException {

                        }

                        @Override
                        public void onContactlessOnlinePlaceCardMode(int i) throws RemoteException {

                        }

                        @Override
                        public void onFinish(int i, Bundle bundle) throws RemoteException {
                            if (rfReader == null || iccCardReader == null){
                                return;
                            }
                            try {
                                rfReader.stopSearch();
                                iccCardReader.stopSearch();
                                Log.d("Finished", "Yes");
                            }catch (RemoteException e){
                                promise.reject(e);
                            }
                        }

                        @Override
                        public void onSetAIDParameter(String s) throws RemoteException {

                        }

                        @Override
                        public void onSetCAPubkey(String s, int i, int i1) throws RemoteException {

                        }

                        @Override
                        public void onTRiskManage(String s, String s1) throws RemoteException {

                        }

                        @Override
                        public void onSelectLanguage(String s) throws RemoteException {

                        }

                        @Override
                        public void onSelectAccountType(List<String> list) throws RemoteException {
                            Log.d("Account Type", list.toString());
                        }

                        @Override
                        public void onIssuerVoiceReference(String s) throws RemoteException {

                        }

                        @Override
                        public void onDisplayOfflinePin(int i) throws RemoteException {

                        }

                        @Override
                        public void inputAmount(int i) throws RemoteException {

                        }

                        @Override
                        public void onGetCardResult(int i, Bundle bundle) throws RemoteException {

                        }

                        @Override
                        public void onDisplayMessage() throws RemoteException {

                        }

                        @Override
                        public void onUpdateServiceAmount(String s) throws RemoteException {

                        }

                        @Override
                        public void onCheckServiceBlackList(String s, String s1) throws RemoteException {

                        }

                        @Override
                        public void onGetServiceDirectory(byte[] bytes) throws RemoteException {

                        }
                    });
                }
            };

            iccCardReader.searchCard(listener, 60, new String[]{IccCardType.CPUCARD, IccCardType.AT24CXX, IccCardType.AT88SC102});
            rfReader.searchCard(listener, 60, new String[]{IccCardType.CPUCARD, IccCardType.M1CARD, IccCardType.AT88SC102});

            
        }catch(RemoteException e){
            e.printStackTrace();
            promise.reject(e);
        }
    }

   @ReactMethod
    public void isCardExist(Promise promise) {
        Log.d("TAG", "###isCardExist>>>");
       try{
           final IccCardReader iccCardReader = DeviceHelper.getIccCardReader(IccReaderSlot.ICSlOT1);
           final IccCardReader rfReader = DeviceHelper.getIccCardReader(IccReaderSlot.RFSlOT);

           JSONObject json = new JSONObject();
           json.put("iccCard", iccCardReader.isCardExists());
           json.put("rfReader", rfReader.isCardExists());
           promise.resolve(json.toString());
       }catch (RemoteException e) {
           e.printStackTrace();
           promise.reject(e);
       }catch (JSONException e) {
           e.printStackTrace();
           promise.reject(e);
       }
   }

    public static Bitmap getImageFromAssetsFile(MorefunReactModule context, String fileName) {
        Bitmap image = null;
        AssetManager am = context.myContext.getResources().getAssets();
        try {
            InputStream is = am.open(fileName);
            image = BitmapFactory.decodeStream(is);
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Log.d("getImageFromAssetsFile", "Bitmap =" + image);
        return image;
    }
}
