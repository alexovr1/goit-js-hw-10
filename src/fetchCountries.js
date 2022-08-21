import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { markupItems } from './render';
import { markupItem } from './render';
import { refs } from './index';

// import { markupItems } from './render'

axios.defaults.baseURL = 'https://restcountries.com/v3.1/name';

export const fetchCountries = (name) => {
    axios(`/${name}?fields=name,capital,population,flags,languages`)
        .then(({ data }) => {
            if (data.length > 10) {
                refs.list.innerHTML = '';
                Notify.info("Too many matches found. Please enter a more specific name.")
            }
            if (data.length <= 10 && data.length >= 2) {
                refs.container.innerHTML = '';
                refs.list.innerHTML = '';
                const renderItems = markupItems(data);
                refs.list.innerHTML = renderItems;
            }
            if (data.length === 1) {
                refs.list.innerHTML = '';
                refs.container.innerHTML = '';
                const renderItem = markupItem(data);
                refs.container.innerHTML = renderItem;
            }
        })

        .catch(function (error) {
            Notify.failure("Oops, there is no country with that name")
        })
}