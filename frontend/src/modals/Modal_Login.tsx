import { useAuth } from "../store/useAuth";
import { useModal } from "../store/useModal";

export const Modal_Login = () => {
  const { currentModal, CloseModal } = useModal((state) => state);
  const { form_auth, postLogin } = useAuth((state) => state);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    useAuth.setState((state) => ({
      form_auth: {
        ...state.form_auth,
        [name]: value,
      },
    }));
  };

  const SendData = async () => {
    console.log(form_auth);
    await postLogin(form_auth);
    CloseModal();
  };

  return (
    <div>
      {currentModal === "login" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 animate-modalIn">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
              <p>LOGIN</p>
              <i
                className="bi bi-x-lg cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => CloseModal()}
              ></i>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="username"
                value={form_auth.username}
                onChange={handleChangeInput}
                placeholder="USUARIO"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

              <input
                type="password"
                name="password"
                value={form_auth.password}
                onChange={handleChangeInput}
                placeholder="CONTRASEÑA"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

              <button
                onClick={() => SendData()}
                className="bg-purple-500 rounded-lg hover:bg-purple-600 text-white py-2 font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <i className="bi bi-floppy"></i>
                INICIAR SESIÓN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
