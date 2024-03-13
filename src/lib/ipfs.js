
//Upload files to IPFS
import axios from 'axios';

export const uploadToIPFS = async (file) => {
    if (!file) return;
    const formData = new FormData();
    const pinateMetadata = JSON.stringify({
        name: file.name || `file-${Date.now()}`
    });
    const pinataOptions = JSON.stringify({
        cidVersion: 0
    });

    formData.append('file', file);
    formData.append('pinataMetadata', pinateMetadata);
    formData.append('pinataOptions', pinataOptions);
    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjNDM0ZTk1NS04NTExLTRmY2EtOTdlYy1mYjllZTFiNmJjNGIiLCJlbWFpbCI6ImFqaGE2NzgzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjNjE4YTc4OWEwYmQ0NWYyOGE0OCIsInNjb3BlZEtleVNlY3JldCI6IjQ5OTg1YjVmMjMyNWY2YTFiNWExYjQ5YjM4MGIzOWE1NzkwMGVhMWE4NWFlOWY5OGMzNTAxZjRmOTUxNDZjMjMiLCJpYXQiOjE3MTAyODgzNjF9.Y_cmBTmQlpAU_JGBcDmEYq12prv5CoXN9s6wfBkY0Wg`
            }
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);

    }
}