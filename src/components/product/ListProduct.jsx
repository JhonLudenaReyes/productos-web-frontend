import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import MaterialTable, { MTableToolbar } from "material-table";
import { Link, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import {
  getProducts,
  deleteProduct,
  setProduct,
} from "../../actions/productActions";
import { changeState } from "../../actions/globalActions";

const columns = [
  { title: "Producto", field: "producto" },
  { title: "Categoria", field: "categoria.categoria" },
  { title: "Precio", field: "precio" },
  { title: "Stock", field: "stock" },
];

const ListProduct = () => {
  const notify = () => toast.success("¡Eliminado satisfactoriamente!");
  const notifyCancel = () => toast("¡Sus datos no han sido eliminados!");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const verification = useSelector((state) => state.product.verification);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (verification) {
      notify();
      dispatch(changeState(false));
      dispatch(getProducts());
    }
  });

  const options = {
    actionsColumnIndex: -1,
  };

  const components = {
    Toolbar: (props) => (
      <>
        <MTableToolbar {...props} />
        <div style={{ padding: "0px 20px" }}>
          <Link
            //onClick={resetPerson}
            to="/product-register"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <i className="material-icons">add_circle</i>
          </Link>
        </div>
      </>
    ),
  };

  const actions = [
    {
      icon: "edit",
      tooltip: "Editar Ticket",
      onClick: (event, rowData) => {
        // Do save operation
        //console.log(rowData);
        dispatch(setProduct(rowData));
        return navigate("/product-register");
      },
    },
    {
      icon: "delete",
      tooltip: "Eliminar Ticket",
      onClick: (event, rowData) => {
        // Do save operation
        let result = window.confirm(
          `¿Está seguro que desea eliminar ${rowData.producto} de la lista de productos`
        );
        result ? dispatch(deleteProduct(rowData.idProducto)) : notifyCancel();
      },
    },
  ];

  return (
    <>
      <Container>
        <h1>LISTADO DE PRODUCTOS</h1>
        <MaterialTable
          title="Productos guardados"
          columns={columns}
          data={products}
          actions={actions}
          options={options}
          components={components}
        />
        <Toaster />
      </Container>
    </>
  );
};

export default ListProduct;
