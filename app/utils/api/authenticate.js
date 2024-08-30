import axios from "axios";
let serverURL = process.env.NEXT_PUBLIC_API_URL;


export const Auth = {
    handleForm: (data) => {
        const { form, post } = data;
        form.preventDefault();
        if (!form.target.checkValidity()) {
            form.preventDefault();
            form.stopPropagation();
        }
        form.target.classList.add('was-validated');
        if (form.target.checkValidity()) {
            data.form = form.target;
            post(data);
        }
    },
    user: async ({ form, url }) => {
        const formData = new FormData(form);
        let formdata = {};
        formData.forEach(function (value, key) {
            formdata[key] = value;
        });
        formdata.AccessKey = process.env.NEXT_PUBLIC_ACCESS_KEY; 
        try {
            const response = await axios.post(`${serverURL}${url}`, formdata, {
                headers: {
                    "apikey": "Ti99nbZ4zl9fu3AfUv8afirAiyXWAWtas7Kgm8jWY2wEUGthZ3jLsUO7kNWpcPng22mnIC0LM4torLEEjrgMBVcpmHrY40CLzXBBqredshUNRtrkXehq5a8pnwVC533f",
                    "Content-Type": "application/json",
                },
            })
            return response.data;
        } catch (error) {
            return error?.response && error?.response?.data;
        }
    },

}