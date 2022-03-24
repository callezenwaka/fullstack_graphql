import os from "os";

const network = os?.networkInterfaces()?.en0?.find(elm => elm.family=='IPv4')?.address || '000.000.0.000';

export default network;