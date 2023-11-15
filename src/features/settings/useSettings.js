import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

export async function useSettings(){
    const {isLoading,error,data: settings} = useQuery({
        queryFn: getSettings,
        queryKey: ['settings']
    })

    return {isLoading,settings,error}
}