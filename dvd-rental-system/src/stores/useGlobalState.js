import {create} from 'zustand';


    const useGlobalState = create((set) => ({
        token: "",
        role: "",
        searchName:"",
        categories: [],
        setToken: (value) => set({token: value}),
        setRole: (value) => set({role: value}),
        setSearchName: (value) => set({searchName: value}),
        setCategories: (value) => set({categories: value})
}));

export default useGlobalState;
