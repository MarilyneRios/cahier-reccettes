// DeleteAccountButton.jsx
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation } from "../../redux/users/usersApiSlice";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../../redux/users/userSlice";
import { FaTrashAlt } from "react-icons/fa";
import "./deleteAcountButton.styles.css"

const DeleteAccountButton = ({ onClose }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await deleteUser({
        id: currentUser._id,
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      }).unwrap();

      if (res.success === false) {
        dispatch(deleteUserFailure(res));
        return;
      }

      dispatch(deleteUserSuccess(res));
      navigate("/");
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content p-4 border border-dark bg-white rounded">
        <h4 className="text-danger">⚠️ Attention</h4>
        <p>Souhaitez-vous vraiment supprimer ce compte ?</p>
        <p className="text-muted">Cette action est irréversible.</p>
        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Supprimer <FaTrashAlt />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountButton;
