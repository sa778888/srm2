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
                'Authorization': `Bearer ${JWT}`
            }
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);

    }
}