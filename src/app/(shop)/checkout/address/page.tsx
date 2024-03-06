import { Title } from '@/components';
import Link from 'next/link';
import AdressForm from './ui/AdressForm';
import { getCountries, getUserAdress } from '@/actions';
import { auth } from '@/auth.config';

export default async function AdressPage() {

    const countries = await getCountries()
    const session = await auth()

    if (!session?.user) {
        return (
            <h3>No hay session de usuario</h3>
        )
    }

    const address = await getUserAdress(session.user.id) ?? undefined

    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

                <Title title="Dirección" subtitle="Dirección de entrega" />

                <AdressForm
                    userStoreAdress={address}
                    countries={countries}
                />

            </div>




        </div>
    );
}