import useStores from '../store/useStores';

export default () =>{
    const {themeStore} = useStores();
    return themeStore.settings.current.layout.config;
}
