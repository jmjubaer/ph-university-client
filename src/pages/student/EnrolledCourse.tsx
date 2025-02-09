import { Col, Row } from "antd";
import { useGetMyEnrolledCourseQuery } from "../../redux/features/student/studentManagement.api";

const EnrolledCourse = () => {
    const { data } = useGetMyEnrolledCourseQuery(undefined);
    console.log(data);
    return (
        <Row gutter={[0, 20]}>
            {data?.data?.map((course: any) => (
                <Col
                    span={24}
                    key={course.course?.title}
                    style={{ border: "solid #d4d4d4 1px" }}>
                    <Row justify={"space-between"}>
                        <Col span={5} style={{ padding: "10px" }}>
                            <h4>{course.course?.title}</h4>
                        </Col>
                        <Col span={2} style={{ padding: "10px" }}>
                            <p>Section: {course.offeredCourse?.section}</p>
                        </Col>
                        <Col span={4} style={{ padding: "10px" }}>
                            Days:
                            {course.offeredCourse.days?.map((day: string) => (
                                <span key={day}> {day} </span>
                            ))}
                        </Col>
                        <Col span={4} style={{ padding: "10px" }}>
                            <p>Start Time: {course.offeredCourse?.startTime}</p>
                        </Col>
                        <Col span={4} style={{ padding: "10px" }}>
                            <p>End Time: {course.offeredCourse?.endTime}</p>
                        </Col>
                    </Row>
                </Col>
            ))}
        </Row>
    );
};

export default EnrolledCourse;
