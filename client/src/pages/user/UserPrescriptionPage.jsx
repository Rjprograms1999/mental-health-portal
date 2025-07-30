import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrescriptions } from "../../redux/prescriptionSlice";

const UserPrescriptionPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { list: prescriptions, loading } = useSelector(
    (state) => state.prescriptions
  );

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchPrescriptions(user._id));
    }
  }, [dispatch, user]);

  return (
    <div>
      <h2>Your Prescriptions</h2>

      {loading ? (
        <p>Loading...</p>
      ) : prescriptions.length === 0 ? (
        <p>No active prescriptions found.</p>
      ) : (
        <ul>
          {prescriptions.map((prescription) => (
            <li key={prescription._id} style={{ marginBottom: "1rem" }}>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(prescription.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Notes:</strong> {prescription.notes}
              </p>
              {prescription.fileUrl && (
                <p>
                  <a
                    href={prescription.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📎 View File
                  </a>
                </p>
              )}
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{ color: prescription.isActive ? "green" : "red" }}
                >
                  {prescription.isActive ? "Active" : "Inactive"}
                </span>
              </p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserPrescriptionPage;
