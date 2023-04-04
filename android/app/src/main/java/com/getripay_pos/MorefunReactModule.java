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

import com.facebook.react.bridge.ReadableMap;
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
        new Thread(new Runnable() {
            @Override
            public void run() {
                getAllDeviceInfo(promise);
            }
        }).start();
    }

    public void getAllDeviceInfo(Promise promise){
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
    public void print(ReadableMap readableMap, Promise promise) {
        Log.d("TAG", "###print>>>");
        try {
            String forWho = readableMap.getString("forWho");
            String name = readableMap.getString("name");
            String location = readableMap.getString("location");
            String terminal = readableMap.getString("terminal");
            String amount = readableMap.getString("amount");
            String card = readableMap.getString("cardNo");
            String expiry = readableMap.getString("expiry");
            String cardName = readableMap.getString("cardName");
            String dateTime = readableMap.getString("dateTime");
            String stan = readableMap.getString("stan");
            String aid = readableMap.getString("aid");
            String rrn = readableMap.getString("rrn");
            String message = readableMap.getString("message");
            String responseCode = readableMap.getString("responseCode");
            String authorizeCode = readableMap.getString("authorizeCode");

            List<MulPrintStrEntity> list = new ArrayList<>();
            int fontSizeLg = FontFamily.MIDDLE;
            int fontSize = FontFamily.SMALL;
            int fontSizeBg = FontFamily.BIG;
            Bundle config = new Bundle();
            config.putInt(PrinterConfig.COMMON_GRAYLEVEL, 30);

            MulPrintStrEntity entity = new MulPrintStrEntity(forWho, fontSizeLg);
            Bitmap imageFromAssetsFile = getImageFromAssetsFile(this, "logo.bmp");
            entity.setBitmap(imageFromAssetsFile);
            entity.setMarginX(20);
            entity.setGravity(Gravity.CENTER);
            entity.setUnderline(true);
            entity.setYspace(10);
            list.add(entity);

            list.add(new MulPrintStrEntity("MERCHANT NAME:", fontSize).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity(name, fontSizeLg).setGravity(Gravity.LEFT).setYspace(10));
            list.add(new MulPrintStrEntity("LOCATION:", fontSize).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity(location, fontSizeLg).setGravity(Gravity.LEFT).setYspace(10));
            list.add(new MulPrintStrEntity("TERMINAL ID:" + " " + terminal, fontSize).setGravity(Gravity.LEFT));

            list.add(new MulPrintStrEntity("=============================", fontSizeLg));

            list.add(new MulPrintStrEntity("STAN:" + " " + stan, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("DATE/TIME:" + " " + dateTime, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("AMOUNT:" + " " + amount, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("CARD:" + " " + card, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("NAME:" + " " + cardName, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("EXPIRY:" + " " + expiry, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("AUTHORIZATION CODE:" + " " + authorizeCode, fontSizeLg).setGravity(Gravity.LEFT));

            list.add(new MulPrintStrEntity("=============================", fontSizeLg));

            list.add(new MulPrintStrEntity(message, fontSizeLg).setGravity(Gravity.CENTER).setIsBold(2).setYspace(10));
            list.add(new MulPrintStrEntity("AID:" + " " + aid, fontSize).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("RRN:" + " " + rrn, fontSize).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("RESPONSE CODE:" + " " + responseCode, fontSize).setGravity(Gravity.LEFT));

            list.add(new MulPrintStrEntity("=============================", fontSizeLg));

            list.add(new MulPrintStrEntity("--------------------------------------", fontSize));
            list.add(new MulPrintStrEntity("Thanks for using Getripay POS", FontFamily.MIDDLE).setGravity(Gravity.CENTER));
            list.add(new MulPrintStrEntity("---X---X---X---X---X--X--X--X--X--X--X-\n", fontSizeLg));
            list.add(new MulPrintStrEntity("\n", fontSize).setYspace(60));

            JSONObject json = new JSONObject();
            
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
    public void printTransfer(ReadableMap readableMap, Promise promise) {
        Log.d("TAG", "###print>>>");
        try {
            String forWho = readableMap.getString("forWho");
            String name = readableMap.getString("name");
            String location = readableMap.getString("location");
            String terminal = readableMap.getString("terminal");
            String amount = readableMap.getString("amount");
            String recipient = readableMap.getString("recipient");
            String recipientBank = readableMap.getString("recipientBank");
            String accountNo = readableMap.getString("accountNo");
            String reference = readableMap.getString("reference");
            String dateTime = readableMap.getString("dateTime");
            String message = readableMap.getString("message");
            String responseCode = readableMap.getString("responseCode");
            String authorizeCode = readableMap.getString("authorizeCode");

            List<MulPrintStrEntity> list = new ArrayList<>();
            int fontSizeLg = FontFamily.MIDDLE;
            int fontSize = FontFamily.SMALL;
            int fontSizeBg = FontFamily.BIG;
            Bundle config = new Bundle();
            config.putInt(PrinterConfig.COMMON_GRAYLEVEL, 30);

            MulPrintStrEntity entity = new MulPrintStrEntity(forWho, fontSizeLg);
            Bitmap imageFromAssetsFile = getImageFromAssetsFile(this, "logo.bmp");
            entity.setBitmap(imageFromAssetsFile);
            entity.setMarginX(20);
            entity.setGravity(Gravity.CENTER);
            entity.setUnderline(true);
            entity.setYspace(10);
            list.add(entity);

            list.add(new MulPrintStrEntity("MERCHANT NAME:", fontSize).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity(name, fontSizeLg).setGravity(Gravity.LEFT).setYspace(10));
            list.add(new MulPrintStrEntity("LOCATION:", fontSize).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity(location, fontSizeLg).setGravity(Gravity.LEFT).setYspace(10));
            list.add(new MulPrintStrEntity("TERMINAL ID:" + " " + terminal, fontSize).setGravity(Gravity.LEFT));

            list.add(new MulPrintStrEntity("=============================", fontSizeLg));

            list.add(new MulPrintStrEntity("Date/Time:" + " " + dateTime, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("Amount:" + " " + amount, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("Recipient:" + " " + recipient, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("Bank:" + " " + recipientBank, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("Account Number:" + " " + accountNo, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("Authorization Code:" + " " + authorizeCode, fontSizeLg).setGravity(Gravity.LEFT));

            list.add(new MulPrintStrEntity("=============================", fontSizeLg));

            list.add(new MulPrintStrEntity(message, fontSizeLg).setGravity(Gravity.CENTER).setIsBold(2).setYspace(10));
            list.add(new MulPrintStrEntity("RESPONSE CODE:" + " " + responseCode, fontSize).setGravity(Gravity.LEFT));

            list.add(new MulPrintStrEntity("=============================", fontSizeLg));

            list.add(new MulPrintStrEntity("--------------------------------------", fontSize));
            list.add(new MulPrintStrEntity("Thanks for using Getripay POS", FontFamily.MIDDLE).setGravity(Gravity.CENTER));
            list.add(new MulPrintStrEntity("---X---X---X---X---X--X--X--X--X--X--X-\n", fontSizeLg));
            list.add(new MulPrintStrEntity("\n", fontSize).setYspace(60));

            JSONObject json = new JSONObject();
            
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
    public void printBill(ReadableMap readableMap, Promise promise) {
        Log.d("TAG", "###print>>>");
        try {
            String forWho = readableMap.getString("forWho");
            String name = readableMap.getString("name");
            String location = readableMap.getString("location");
            String terminal = readableMap.getString("terminal");
            String amount = readableMap.getString("amount");
            String billType = readableMap.getString("billType");
            String reference = readableMap.getString("reference");
            String dateTime = readableMap.getString("dateTime");
            String message = readableMap.getString("message");
            String responseCode = readableMap.getString("responseCode");
            String authorizeCode = readableMap.getString("authorizeCode");

            List<MulPrintStrEntity> list = new ArrayList<>();
            int fontSizeLg = FontFamily.MIDDLE;
            int fontSize = FontFamily.SMALL;
            int fontSizeBg = FontFamily.BIG;
            Bundle config = new Bundle();
            config.putInt(PrinterConfig.COMMON_GRAYLEVEL, 30);

            MulPrintStrEntity entity = new MulPrintStrEntity(forWho, fontSizeLg);
            Bitmap imageFromAssetsFile = getImageFromAssetsFile(this, "logo.bmp");
            entity.setBitmap(imageFromAssetsFile);
            entity.setMarginX(20);
            entity.setGravity(Gravity.CENTER);
            entity.setUnderline(true);
            entity.setYspace(10);
            list.add(entity);

            list.add(new MulPrintStrEntity("MERCHANT NAME:", fontSize).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity(name, fontSizeLg).setGravity(Gravity.LEFT).setYspace(10));
            list.add(new MulPrintStrEntity("LOCATION:", fontSize).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity(location, fontSizeLg).setGravity(Gravity.LEFT).setYspace(10));
            list.add(new MulPrintStrEntity("TERMINAL ID:" + " " + terminal, fontSize).setGravity(Gravity.LEFT));

            list.add(new MulPrintStrEntity("=============================", fontSizeLg));

            list.add(new MulPrintStrEntity("DATE/TIME:" + " " + dateTime, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("AMOUNT:" + " " + amount, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("BILL:" + " " + billType, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("REFERENCE:" + " " + reference, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("AUTHORIZATION CODE:" + " " + authorizeCode, fontSizeLg).setGravity(Gravity.LEFT));

            list.add(new MulPrintStrEntity("=============================", fontSizeLg));

            list.add(new MulPrintStrEntity(message, fontSizeLg).setGravity(Gravity.CENTER).setIsBold(2).setYspace(10));
            list.add(new MulPrintStrEntity("RESPONSE CODE:" + " " + responseCode, fontSize).setGravity(Gravity.LEFT));

            list.add(new MulPrintStrEntity("=============================", fontSizeLg));

            list.add(new MulPrintStrEntity("--------------------------------------", fontSize));
            list.add(new MulPrintStrEntity("Thanks for using Getripay POS", FontFamily.MIDDLE).setGravity(Gravity.CENTER));
            list.add(new MulPrintStrEntity("---X---X---X---X---X--X--X--X--X--X--X-\n", fontSizeLg));
            list.add(new MulPrintStrEntity("\n", fontSize).setYspace(60));

            JSONObject json = new JSONObject();
            
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
    public void printBalance(ReadableMap readableMap, Promise promise) {
        Log.d("TAG", "###print>>>");
        try {
            String forWho = readableMap.getString("forWho");
            String name = readableMap.getString("name");
            String location = readableMap.getString("location");
            String terminal = readableMap.getString("terminal");
            String availableBalance = readableMap.getString("availableBalance");
            String ledgerBalance = readableMap.getString("ledgerBalance");
            String accountNo = readableMap.getString("accountNo");
            String bank = readableMap.getString("bank");
            String responseCode = readableMap.getString("responseCode");
            String authorizeCode = readableMap.getString("authorizeCode");
            String dateTime = readableMap.getString("dateTime");

            List<MulPrintStrEntity> list = new ArrayList<>();
            int fontSizeLg = FontFamily.MIDDLE;
            int fontSize = FontFamily.SMALL;
            int fontSizeBg = FontFamily.BIG;
            Bundle config = new Bundle();
            config.putInt(PrinterConfig.COMMON_GRAYLEVEL, 30);

            MulPrintStrEntity entity = new MulPrintStrEntity(forWho, fontSizeLg);
            Bitmap imageFromAssetsFile = getImageFromAssetsFile(this, "logo.bmp");
            entity.setBitmap(imageFromAssetsFile);
            entity.setMarginX(20);
            entity.setGravity(Gravity.CENTER);
            entity.setUnderline(true);
            entity.setYspace(10);
            list.add(entity);

            list.add(new MulPrintStrEntity("MERCHANT NAME:", fontSize).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity(name, fontSizeLg).setGravity(Gravity.LEFT).setYspace(10));
            list.add(new MulPrintStrEntity("LOCATION:", fontSize).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity(location, fontSizeLg).setGravity(Gravity.LEFT).setYspace(10));
            list.add(new MulPrintStrEntity("TERMINAL ID:" + " " + terminal, fontSize).setGravity(Gravity.LEFT));

            list.add(new MulPrintStrEntity("=============================", fontSizeLg));

            list.add(new MulPrintStrEntity("Date/Time:" + " " + dateTime, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("Available Balance:" + " " + availableBalance, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("Ledger Balance:" + " " + ledgerBalance, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("Bank:" + " " + bank, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("Account Number:" + " " + accountNo, fontSizeLg).setGravity(Gravity.LEFT));
            list.add(new MulPrintStrEntity("Authorization Code:" + " " + authorizeCode, fontSizeLg).setGravity(Gravity.LEFT));

            list.add(new MulPrintStrEntity("=============================", fontSizeLg));

            list.add(new MulPrintStrEntity("RESPONSE CODE:" + " " + responseCode, fontSize).setGravity(Gravity.LEFT));

            list.add(new MulPrintStrEntity("=============================", fontSizeLg));

            list.add(new MulPrintStrEntity("--------------------------------------", fontSize));
            list.add(new MulPrintStrEntity("Thanks for using Getripay POS", FontFamily.MIDDLE).setGravity(Gravity.CENTER));
            list.add(new MulPrintStrEntity("---X---X---X---X---X--X--X--X--X--X--X-\n", fontSizeLg));
            list.add(new MulPrintStrEntity("\n", fontSize).setYspace(60));

            JSONObject json = new JSONObject();
            
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
