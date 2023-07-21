import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllInstructors } from "../../apicalls/instructors";
import { ShowLoader } from "../../redux/loaderSlice";

function Home() {
  const [instructors = [], setInstructors] = React.useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const getData = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetAllInstructors();
      if (response.success) {
        setInstructors(response.data);
      } else {
        message.error(response.message);
      }

      dispatch(ShowLoader(false));
    } catch (error) {
      message.error(error.message);
      dispatch(ShowLoader(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const navigate = useNavigate();
  return (
    user && (
      <div>
        <div className="flex justify-between">
          <div>
            <input placeholder="Search instructors" className="w-400" />
          </div>
          {user?.role !== "instructor" && (
            <button
              className="outlined-btn"
              onClick={() => navigate("/apply-instructor")}
            >
              Apply instructor
            </button>
          )}
        </div>

        <Row gutter={[16, 16]} className="my-1">
          {instructors.map((instructor) => {
            return (
              <Col span={8}>
                <div
                  className="bg-white p-1 flex flex-col gap-1 cursor-pointer"
                  onClick={() => navigate(`/book-appointment/${instructor.id}`)}
                >
                  <div className="flex justify-between w-full">
                    <h2 className="uppercase">
                      {instructor.firstName} {instructor.lastName}
                    </h2>
                  </div>
                  <hr />
                  <div className="flex justify-between w-full">
                    <h4>
                      <b>Speciality : </b>
                    </h4>
                    <h4>{instructor.speciality}</h4>
                  </div>
                  <div className="flex justify-between w-full">
                    <h4>
                      <b>Experience : </b>
                    </h4>
                    <h4>
                      {instructor.experience}
                      Years
                    </h4>
                  </div>
                  <div className="flex justify-between w-full">
                    <h4>
                      <b>Email : </b>
                    </h4>
                    <h4>{instructor.email}</h4>
                  </div>
                  <div className="flex justify-between w-full">
                    <h4>
                      <b>Phone : </b>
                    </h4>
                    <h4>{instructor.phone}</h4>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    )
  );
}

export default Home;
