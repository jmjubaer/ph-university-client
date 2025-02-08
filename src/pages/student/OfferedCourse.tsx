/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import {
    useEnrollCourseMutation,
    useGetMyOfferCourseQuery,
} from "../../redux/features/student/studentManagement.api";

const OfferedCourse = () => {
    const [enrollCourse] = useEnrollCourseMutation();
    const { data: offeredCourseData } = useGetMyOfferCourseQuery(undefined);
    // console.log(offeredCourseData);
    const singleObject = offeredCourseData?.data?.reduce(
        (
            acc: { [x: string]: any },
            item: {
                course: { title: any };
                section: any;
                _id: any;
                endTime: any;
                startTime: any;
                days: any;
            }
        ) => {
            const key = item?.course?.title;
            acc[key] = acc[key] || { courseTitle: key, sections: [] };
            acc[key]?.sections?.push({
                section: item.section,
                _id: item._id,
                endTime: item.endTime,
                startTime: item.startTime,
                days: item.days,
            });
            return acc;
        },
        {}
    );
    const modifiedData = Object.values(singleObject ? singleObject : {});
    // console.log(modifiedData);
    const handleEnrollCourse = async (id: string) => {
        const enrollCourseData = {
            offeredCourse: id,
        };
        console.log(enrollCourseData);
        const res = await enrollCourse(enrollCourseData);
        console.log(res);
    };
    if (modifiedData?.length < 1) {
        return <p>Any offer course not available</p>;
    }
    return (
        <Row gutter={[0, 20]}>
            {modifiedData?.map((item: any) => (
                <Col
                    span={24}
                    key={item.courseTitle}
                    style={{ border: "solid #d4d4d4 1px" }}>
                    <div>
                        <div style={{ padding: "10px" }}>
                            <h3>{item.courseTitle}</h3>
                        </div>
                        {item.sections?.map((section: any) => (
                            <Row
                                key={section._id}
                                justify={"space-between"}
                                align={"middle"}
                                style={{
                                    padding: "5px 10px",
                                    borderTop: "solid #d4d4d4 1px ",
                                }}>
                                <Col span={5}>Section: {section.section}</Col>
                                <Col span={5}>
                                    Days:
                                    {section.days?.map((day: string) => (
                                        <span key={day}> {day} </span>
                                    ))}
                                </Col>
                                <Col span={5}>
                                    Start Time: {section.startTime}
                                </Col>
                                <Col span={5}>End Time: {section.endTime}</Col>
                                <Button
                                    onClick={() =>
                                        handleEnrollCourse(section._id)
                                    }
                                    type='primary'>
                                    Enroll
                                </Button>
                            </Row>
                        ))}
                    </div>
                </Col>
            ))}
        </Row>
    );
};

export default OfferedCourse;
