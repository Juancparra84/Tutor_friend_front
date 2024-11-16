import { useState } from 'react';
import { useEffect } from 'react';
import { Global } from '../../helpers/Global';
import { ContentList } from '../content/ContentList';

export const Feed = () => {

    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);

    useEffect(() => {
        getPublications(1, false);
    }, []);

    const getPublications = async (nextPage = 1, showNews = false) => {

        if(showNews){
            setPublications([]);
            setPage(1);
            nextPage = 1;
        }

        const request = await fetch(Global.url + "content/feed/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        if (data.status == "success") {
console.log(data)
            let newPublications = data.contents;

            if (!showNews && publications.length >= 1) {
                newPublications = [...publications, ...data.contents];
            }

            setPublications(newPublications);

            if (!showNews && publications.length >= (data.total - data.contents.length)) {
                setMore(false);
            }

            if(data.pages <= 1){
                setMore(false);
            }
        }
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Artículos</h1>
                <button className="content__button" onClick={() => getPublications(1, true)}>Mostrar nuevas</button>
            </header>

            <ContentList
                publications={publications}
                getPublications={getPublications}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
                isProfile={false} // No es un perfil, es el feed
            />
            <br />
        </>
    )
}
