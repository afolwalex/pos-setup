interface AgentDetails {
    agent: {
        id: number;
        businessAddress: string;
        addressProof: string;
        identityDocument: string;
        name: string;
        email: string;
        phone: string;
        cac: string;
        businessName: string;
    };
    terminal: {
        id: number;
        serialNo: string;
        os: string;
        status: string;
        pinChange: boolean;
    };
    agentTerminal: {
        id: number;
        terminalId: number;
        agentId: number;
        status: boolean;
        location: string;
        accountNumber: string;
        disabledFeatures: string;
    };
}

const agentDetails: AgentDetails | Record<string, never> = {};

export {agentDetails};
