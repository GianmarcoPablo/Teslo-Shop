import { create } from "zustand"
import { persist } from "zustand/middleware"

interface State {
    address: {
        firstName: string,
        lastName: string,
        address: string,
        address2?: string,
        postalCode: string,
        city: string,
        country: string,
        phone: string,
    }
    setAdress: (address: State["address"]) => void
}


export const useAdressStore = create<State>()(
    persist(
        (set, get) => ({
            address: {
                firstName: "",
                lastName: "",
                address: "",
                address2: "",
                postalCode: "",
                city: "",
                country: "",
                phone: "",
            },
            setAdress: (address) => {
                set({ address })
            }
        }),

        {
            name: "address-storage"
        }
    )

)