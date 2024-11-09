import PropTypes from 'prop-types';
import { Global } from '../../helpers/Global';
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import avatar from '../../assets/img/default.png';
import ReactTimeAgo from "react-time-ago";
import Swal from 'sweetalert2';

export const ContentList = ({ publications, getPublications, page, setPage, more, setMore, isProfile = false }) => {

    const { auth, setCounters } = useAuth();
    const navigate = useNavigate();

    // Función para manejar la redirección al detalle de la publicación
    const handleClick = (publicationId) => {
        const from = isProfile ? 'myPublications' : 'feed';
        navigate(`/rsocial/publicacion/${publicationId}`, { state: { from } });
    };

    // Función para cargar la siguiente página de publicaciones
    const nextPage = () => {
        const next = page + 1;
        setPage(next);
        getPublications(next);
    };

    // Función para eliminar una publicación con confirmación de SweetAlert
    const deletePublication = async (publicationId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const request = await fetch(Global.url + "content/delete-content/" + publicationId, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }
                });

                const data = await request.json();

                if (data.status === "success") {
                    Swal.fire('¡Eliminada!', 'La publicación ha sido eliminada.', 'success');
                    setPage(1);
                    setMore(true);
                    getPublications(1, true);

                    setCounters((prevCounters) => ({
                        ...prevCounters,
                        publicationsCount: prevCounters.publicationsCount - 1,
                    }));
                } else {
                    Swal.fire('Error', 'Hubo un error al eliminar la publicación.', 'error');
                }
            }
        });
    };

    return (
        <>
            <div className="content__posts">
                {publications.map((publication) => {
                    if (!publication || !publication.user) {
                        return null;
                    }

                    return (
                        <article className="posts__post" key={publication._id}
                            onClick={() => handleClick(publication._id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="post__container">
                                <div className="post__image-user">
                                    <Link to={`/rsocial/perfil/${publication.user._id}`} className="post__image-link">
                                        {publication.user.image !== "default.png" ? (
                                            <img src={publication.user.image} className="post__user-image" alt="Foto de perfil" />
                                        ) : (
                                            <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                                        )}
                                    </Link>
                                </div>

                                <div className="post__body">
                                    <div className="post__user-info">
                                        <Link to={`/rsocial/perfil/${publication.user._id}`} className="user-info__name">
                                            {publication.user.name && publication.user.last_name
                                                ? `${publication.user.name} ${publication.user.last_name}`
                                                : "Usuario Desconocido"}
                                        </Link>
                                        <span className="user-info__divider"> | </span>
                                        <span className="user-info__create-date">
                                            <ReactTimeAgo date={new Date(publication.created_at).getTime()} locale="es-ES" />
                                        </span>
                                    </div>

                                    <h4 className="post__content">{publication.text}</h4>

                                    {publication.file && (
                                        <img src={publication.file} alt="Imagen de publicación" className="post__image-publication" />
                                    )}
                                </div>
                            </div>

                            {auth._id === publication.user._id && (
                                <div className="post__buttons">
                                    <button onClick={() => deletePublication(publication._id)} className="post__button">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>

            {!isProfile && more && (
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver más publicaciones
                    </button>
                </div>
            )}

            {isProfile && (
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={() => navigate('/rsocial/feed')}>
                        Volver al Feed
                    </button>
                </div>
            )}
        </>
    );
};

ContentList.propTypes = {
    publications: PropTypes.array.isRequired,
    getPublications: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    more: PropTypes.bool.isRequired,
    setMore: PropTypes.func.isRequired,
    isProfile: PropTypes.bool,
};
