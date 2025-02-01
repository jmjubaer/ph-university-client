import { useParams } from "react-router-dom";
import { useGetStudentByIdQuery } from "../../../redux/features/admin/userManagement.api";

const StudentDetails = () => {
    const { studentId } = useParams();
    const { data } = useGetStudentByIdQuery(studentId);
    console.log(studentId);
    console.log(data);
    return <div>Name: {data?.data?.fullName}</div>;
};

export default StudentDetails;
