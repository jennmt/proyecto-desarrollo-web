import React from "react";
import img from '../assets/task.svg'

const Banner = () => {
    return (
        <div className="rounded shadow p-5 mt-5 d-flex">
            <img src={img} alt="" width="150"/>
            <div>
                <h3 className="text-primary">Bienvenido a Tareas</h3>
                <h5 className="text-secondary">
                    Con esta aplicación podrás consultar, crear, actualizar y eliminar tus tareas.
                </h5>
                <hr/>
                <p className="text-muted">
                    Esta aplicación fue desarrollada con Spring Boot, ReactJS y MySQL.
                </p>
            </div>
        </div>
    );
}

export default Banner;
