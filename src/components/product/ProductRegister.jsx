import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import Select from "react-select";

import { getCategories } from "../../actions/categoryActions";
import { saveProduct, editProduct } from "../../actions/productActions";
import { changeState, resetStore } from "../../actions/globalActions";

//REACT HOT TOAST
import toast, { Toaster } from "react-hot-toast";

const valueDefault = {
  idProducto: "",
  idCategoria: "",
  producto: "",
  precio: "",
  stock: "",
};

const select = {
  value: 0,
  label: "Seleccione...",
};

const ProductRegister = () => {
  const [producto, setProducto] = useState(valueDefault);

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(select);
  const categories = useSelector((state) => state.category.categories);
  const verification = useSelector((state) => state.product.verification);
  const product = useSelector((state) => state.product.product);

  //NOTIFICATIONS
  const notify = () => toast.success("¡Producto guardado satisfactoriamente!");
  const dispatch = useDispatch();

  //IF VERIFICATION IS TRUE SHOW NOTIFICATION
  useEffect(() => {
    if (verification) {
      notify();
      //CHANGE INITIAL STATE IN THE STORE
      dispatch(changeState(false));
    }
  });

  useEffect(() => {
    console.log(product);
    if (product.idProducto) {
      setProducto({
        ...producto,
        producto: product.producto,
        precio: product.precio,
        stock: product.stock,
      });
      setSelectedOption({
        ...selectedOption,
        value: product.categoria.idCategoria,
        label: product.categoria.categoria,
      });
      console.log(selectedOption);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  //EJECUTA SETPEOPLE
  useEffect(() => {
    setCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  //ALMACENA LAS LOCALIZACIONES
  const setCategories = () => {
    const optionCategories = [];
    categories.map(
      (category, index) =>
        (optionCategories[index] = {
          value: category.idCategoria,
          label: category.categoria,
        })
    );
    setOptions([
      {
        ...options,
        options: optionCategories,
      },
    ]);
  };

  const onChange = (e) => {
    setProducto({
      ...producto,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const saveData = {
      idCategoria: selectedOption.value,
      producto: producto.producto,
      precio: producto.precio,
      stock: producto.stock,
    };

    const editData = {
      idProducto: product.idProducto,
      idCategoria: selectedOption.value,
      producto: producto.producto,
      precio: producto.precio,
      stock: producto.stock,
    };

    if (product.idProducto) {
      dispatch(editProduct(editData));
    } else {
      dispatch(saveProduct(saveData));
    }
    clearForm();
  };

  const clearForm = () => {
    setProducto(valueDefault);
    setSelectedOption(select);
  };

  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Link
              onClick={resetStore([])}
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <i className="material-icons left">keyboard_backspace</i>
              Volver a lista de productos
            </Link>
            <h2>
              <b>REGISTRO DE PRODUCTOS</b>
            </h2>
            <Form noValidate onSubmit={onSubmit}>
              <FormGroup>
                <FormLabel>Producto</FormLabel>
                <FormControl
                  value={producto.producto}
                  id="producto"
                  type="text"
                  onChange={onChange}
                  placeholder="Ingrese un producto"
                />
              </FormGroup>
              <FormLabel>Categoria</FormLabel>
              <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
              <FormGroup>
                <FormLabel>precio</FormLabel>
                <FormControl
                  value={producto.precio}
                  id="precio"
                  type="text"
                  onChange={onChange}
                  placeholder="Ingrese precio del producto"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Stock</FormLabel>
                <FormControl
                  value={producto.stock}
                  id="stock"
                  type="text"
                  onChange={onChange}
                  placeholder="Ingrese stock del producto"
                />
              </FormGroup>
              <hr />
              <Button variant="primary" type="submit">
                Guardar los cambios
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
        <Toaster />
      </Container>
    </>
  );
};

export default ProductRegister;
