import Cabecera from './components/Cabecera.jsx';
import Menu from './components/Menu.jsx';
import Contenido from './components/Contenido.jsx';
import Footer from './components/Footer.jsx';
import Confirmar from './components/Confirmar.jsx';
import Notificaciones from './components/Notificaciones.jsx';

function App() {

  return (
    <>
      <Cabecera />
      <Menu />
      <Contenido />
      <Confirmar />
      <Notificaciones />
      <Footer />
    </>
  )
}

/** TRIGGERS DE LA APLICACIÓN.
 * -------------------------------
 * 
 * Este primer trigger nos permite insertar un nuevo rol de usuario cada vez que se inserta un nuevo usuario.
 * Para asegurar correctamente su rol, le asignamos por defecto el rol de usuario.
 * create or replace function public.insertar_usuarios()
 *         returns trigger as $$
 *         begin
 *           insert into public.roles (id_rol, email, rol)
 *           values (new.id, new.email, 'usuario');
 *           return new;
 *         end;
 *         $$ language plpgsql security definer;
 * 
 * Este segundo trigger se encarga de ejecutar la función anterior cuando se crea un nuevo usuario.
 * create trigger al_crear_usuario
 *         after insert on auth.users
 *         for each row execute procedure public.insertar_usuarios();
 * 
 * Este tercer trigger se encarga de comprobar si el usuario que está haciendo una determinada petición es administrador o no,
 * permitiendo o no realizar dicha acción. (Abajo indico dónde lo he usado en las RLS).
 * create or replace function public.comprobar_rol()
 *         returns boolean as $$
 *         begin
 *           return exists (
 *             select 1
 *             from public.roles
 *             where id_rol = auth.uid()
 *             and rol = 'administrador'
 *           );
 *         end;
 *         $$ language plpgsql security definer set search_path = public;
 */


/** RLS
 * Para simplificar, he usado la función comprobar_rol() en aquellas tablas donde solo quiero que
 * el administrador pueda realizar cambios en las siguientes tablas:
 * 
 * Roles: UPDATE y SELECT
 * Productos: UPDATE, INSERT y DELETE
 * 
 * De la misma manera, pero negando la condición (!comprobar_rol()), he impedido
 * que un administrador pueda realizar cambios en las siguientes tablas:
 * 
 * Lista_productos: UPDATE, INSERT y DELETE.
 * Lista: UPDATE, INSERT y DELETE. Esto ha sido cosa de diseño. Considero que, para poder realizar pruebas
 *        o cambios significativos relacionados con las listas, deberíamos crear otro rol.
 */

export default App