import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { ContentList } from './ContentList';
import { Global } from '../../helpers/Global';
import { useLocation } from 'react-router-dom';

export const MyPublications = () => {
  const { auth } = useAuth();
  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const location = useLocation(); // Para detectar redirección

  useEffect(() => {
    if (location.state && location.state.newPublication) {
      // Si venimos de la redirección con nueva publicación, recargar las publicaciones
      getPublications(1, true);
    } else {
      getPublications(1, false);
    }
  }, [location.state]);

  const getPublications = async (nextPage = 1, reset = false) => {
    const token = localStorage.getItem('token');
    const request = await fetch(`${Global.url}content/contents-user/${auth._id}/${nextPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    const data = await request.json();

    if (data.status === 'success') {
      let newPublications = data.contents;

      if (!reset && publications.length >= 1) {
        newPublications = [...publications, ...data.contents];
      }

      setPublications(newPublications);

      if (publications.length >= (data.total - data.contents.length)) {
        setMore(false);
      }

      if (data.pages <= 1) {
        setMore(false);
      }
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Mis Publicaciones</h1>
      </header>

      <ContentList
        publications={publications}
        getPublications={getPublications}
        page={page}
        setPage={setPage}
        more={more}
        setMore={setMore}
        isProfile={true} // Esto es el perfil, no el feed
      />
    </>
  );
};
