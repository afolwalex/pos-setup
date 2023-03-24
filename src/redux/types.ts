interface AgentDetails {
    agent_id: string;
    serial_no: string;
    business_address: string;
    requires_pin_change: boolean;
    account_number: string;
    email: string;
    location: string;
    business_name: string;
}

const agentDetails: AgentDetails | Record<string, never> = {};

export {agentDetails};
