import {addDoc, collection, getDocs} from 'firebase/firestore'
import { db } from './firebaseSetup'
import { useState, useEffect, useRef} from "react"

function StudentDirectory() {
    const [info, setInfo] = useState([])
    const birthFieldRef = useRef(null);
    const firstFieldRef = useRef(null);
    const lastFieldRef = useRef(null);
    const genderFieldRef = useRef(null);
    const gradeFieldRef = useRef(null);

    const Data=(props) => {
        return (
            <div className='studentDirectory'>
            
                <td>{props.property}</td>
                
            </div>
        )
    }

    useEffect(() => {
        const info = []
        getDocs(collection(db, "Student"))
        .then((allInfo) => {
            allInfo.forEach((doc) =>
                info.push({...doc.data()})
            )
        setInfo(info)})
    }, [db])

    const addStudent = (e) => {
        e.preventDefault();

        const newStudent = {
            birth: birthFieldRef.current.value,
            first: firstFieldRef.current.value,
            last: lastFieldRef.current.value,
            gender: genderFieldRef.current.value,
            grade: gradeFieldRef.current.value,

        } 
        addDoc(collection(db, "Student"), newStudent)
        .then((docRef) =>{
            setInfo([...info, {id:docRef.id, ...newStudent}])
        })
        .catch((e) => console.error(e))

        birthFieldRef.current.value = ""
        firstFieldRef.current.value = ""
        lastFieldRef.current.value = ""
        genderFieldRef.current.value = ""
        gradeFieldRef.current.value = ""
    }
    
    // function deletePost({id: birth, first, last, gender, grade}){
    //     const channelId = useSelector(selectChannelId)

    //     const deleteTeacher = () => {
    //         return db.collection('channels')
    //             .doc(channelId)
    //             .collection('posts')
    //             .doc(birth)
    //             .delete()
    //             .then(
    //                 ()=>{
    //                     console.log("teacher removed");
    //                 },
    //                 (error) =>{
    //                     console.error("error removing teacher: ", error);
    //                 }
    //             );
                
    //     }
    // }
    return (
      <div>
        <h2>Student Directory</h2>
        <form onSubmit={addStudent} >
            <p>
                <label>Birthdate </label>
                <input type="text" ref={birthFieldRef} />
            </p>
            <p>
                <label>First Name </label>
                <input type="text" ref={firstFieldRef} />
            </p>
            <p>
                <label>Last Name </label>
                <input type="text" ref={lastFieldRef} />
            </p>
            <p>
                <label>Gender </label>
                <input type="text" ref={genderFieldRef} />
            </p>
            <p>
                <label>Grade </label>
                <input type="text" ref={gradeFieldRef} />
            </p>
                <input type="submit"/>
        </form>
        <table>
          <thead>
            <tr>
              <td> </td>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Birthday</th>
              <th scope="col">Gender</th>
              <th scope="col">Grade Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"></th>
              <td>
              {info.map((student) => (
                <Data property={student.first} />
              ))}
              </td>
              <td>
              {info.map((student) => (
                <Data property={student.last} />
              ))}
              </td>
              <td>
              {info.map((student) => (
                <Data property={student.birth} />
              ))}
              </td>
              <td>
              {info.map((student) => (
                <Data property={student.gender} />
              ))}
              </td>
              <td>
              {info.map((student) => (
                <Data property={student.grade} />
              ))}
              </td>
              
            </tr>
          </tbody>
        </table>
      </div>
    );
}

export default StudentDirectory