import axios from "axios";
import { headers } from "./headers";
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
                headers: headers,
            })
            return response.data;
        } catch (error) {
            return error?.response && error?.response?.data;
        }
    },

}