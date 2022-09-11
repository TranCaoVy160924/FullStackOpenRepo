const Course = ({ courses }) => {
    return (
        <>
            {courses.map(course =>
                <div key={course.id}>
                    <Header text={course.name} />
                    <Content parts={course.parts} />
                </div>
            )}
        </>
    )
}


const Header = ({ text }) => <h2>{text}</h2>


const Content = ({ parts }) => {
    let totalExcercices = parts
        .reduce((total, part) => total += part.exercises, 0)

    return (
        <>
            <div>
                {parts.map(part =>
                    <div key={part.id}>
                        {part.name} {part.exercises}
                    </div>
                )}
            </div>
            <strong>total of {totalExcercices} exercises</strong>
        </>

    )
}

export default Course