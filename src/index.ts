import { IPFSCONFIG, getCIDfromPath, Status, Contract, ipfsCat, parseContract, verifyParticipant } from "@ricardianfabric/verify-signed-contract/src/index";

(async function () {
    const title = document.getElementById("title-header");

    const CIDOptions = getCIDfromPath();

    if (CIDOptions.status === Status.failure) {
        console.error(CIDOptions.error);
        title.innerText = CIDOptions.error
        return;
    }

    const ipfsDataOptions = await ipfsCat(CIDOptions.data, IPFSCONFIG);
    if (ipfsDataOptions.status === Status.failure) {
        // log your error, or display on UI
        console.error(ipfsDataOptions.error);
        return;
    }
    const contractOptions = await parseContract(ipfsDataOptions.data);

    if (contractOptions.status === Status.failure) {
        console.error(contractOptions.error);
        return;
    }

    const participantOptions = await verifyParticipant(contractOptions.data);

    if (participantOptions.status === Status.failure) {
        console.error(participantOptions.error);
        return;
    }

    const participantAddress = participantOptions.data;


    title.innerText = `Hello ${participantAddress}`;

})();

