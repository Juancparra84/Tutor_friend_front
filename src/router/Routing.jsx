import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../components/layouts/public/PublicLayout';
import { PrivateLayout } from '../components/layouts/private/PrivateLayout';
import { Error404 } from '../components/layouts/Error404';
import { AuthProvider } from '../context/AuthProvider';
import { Login } from '../components/user/Login';
import { Profile } from '../components/user/Profile';
import { Register } from '../components/user/Register';
import { Logout } from '../components/user/Logout';
import { People } from '../components/user/People';
import { Config } from '../components/user/Config';
import { Following } from '../components/contact/Contacting';
import { Followers } from '../components/contact/Contact_me';
import { MyPublications } from '../components/content/MyPublications';
import { PublicationDetail } from '../components/content/PublicationDetail';
import { Feed } from '../components/content/Feed';
import { Home } from '../components/layouts/public/Home';


export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Cargamos los componentes de la ruta pública en rutas anidadas*/}
          <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='registro' element={<Register />} />
          </Route>

          {/* Cargamos los componentes de la ruta privada  en rutas anidadas*/}
          <Route path="/rsocial" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path='feed' element={<Feed />} />
            <Route path='gente' element={<People />} />
            <Route path='ajustes' element={<Config />} />
            <Route path='logout' element={<Logout />} />
            <Route path='siguiendo/:userId' element={<Following />} />
            <Route path='seguidores/:userId' element={<Followers />} />
            <Route path="perfil/:userId" element={<Profile/>} />
            <Route path="mis-publicaciones" element={<MyPublications />} />
            <Route path="publicacion/:id" element={<PublicationDetail />} />
          </Route>

          {/* Configuramos la ruta para el error 404 */}
          <Route path="*" element={<Error404 />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
