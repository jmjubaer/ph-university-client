import { useGetFacultyCourseQuery } from "../../redux/features/faculty/courseManagement.api";

const MyCourses = () => {
    const {data} = useGetFacultyCourseQuery(undefined);
    console.log(data);
    return (
        <div>
            
        </div>
    );
};

export default MyCourses;