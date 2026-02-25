import { Modal_Season } from "../modals/Modal_Season";
import { useModal } from "../store/useModal";

export const Component_NotFound = () => {
  const { OpenModal } = useModal((state) => state);
  return (
    <>
      <button onClick={() => OpenModal("season")} style={{ background: "red" }}>
        ABRIR MODAL
      </button>
      <Modal_Season />;
    </>
  );
};
