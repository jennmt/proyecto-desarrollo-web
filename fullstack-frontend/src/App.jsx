import { useEffect, useState } from 'react'
import './App.css'
import ListarTareas from './components/ListarTareas'
import { Col, Container, Row } from 'reactstrap'
import axios from 'axios';
import FormularioTarea from './components/FormularioTarea';
import Banner from './components/Banner';

function App() {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState();

  const cargarTareas = () => {
    axios.get('http://localhost:8084/tareas')
      .then(({data}) => setTareas(data));
  }

  useEffect(cargarTareas, []);

  const onSubmit = (values) => {
    if(tarea){
      axios.put(`http://localhost:8084/tareas/${tarea.id}`, values)
      .then(() => {
        setTarea();
        cargarTareas();
      })
    }else{
      axios.post('http://localhost:8084/tareas', values)
      .then(() => cargarTareas());
    }

  }

  const eliminarTarea = (tarea) => {
    axios.delete(`http://localhost:8084/tareas/${tarea.id}`)
      .then(() => cargarTareas());
  }

  return (
    <>
      <Container>
        <Banner/>
        <Row className='mt-5'>
          <Col md={6}>
            <ListarTareas tareas = {tareas} onDelete = {eliminarTarea} onEdit = {(tarea) => setTarea(tarea)} />
          </Col>
          <Col md={6}>
            <FormularioTarea onSubmit = {onSubmit} tarea = {tarea}/>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
