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
        <div className="container_modal">
          <div className="container-modal-body">
            <div className="container-modal-header">
              <p>LOGIN</p>
              <i className="bi bi-x-lg" onClick={() => CloseModal()}></i>
            </div>
            <div className="container-modal-input">
              <input
                style={{ borderRadius: "5px" }}
                type="text"
                name="username"
                value={form_auth.username}
                onChange={handleChangeInput}
                placeholder="USARIO"
              />
              <input
                style={{ borderRadius: "5px" }}
                type="password"
                name="password"
                value={form_auth.password}
                onChange={handleChangeInput}
                placeholder="CONTRASEÑA"
              />
              <button onClick={() => SendData()}>
                <i className="bi bi-floppy"></i> INICIAR SECCION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
