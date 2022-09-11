import React from 'react'

const DisplayPhoneNum = ({ persons }) => (
    <>
        <h2>Numbers</h2>
        <table>
            <tbody>
                {persons.map(person =>
                    <tr key={person.name}>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </>
)

export default DisplayPhoneNum