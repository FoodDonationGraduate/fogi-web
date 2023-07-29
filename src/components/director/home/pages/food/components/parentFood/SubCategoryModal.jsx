// Essentials
import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// Components
import CategoryImageModal from "../CategoryImageModal";

// Reducer
import { retrieveAllCategories } from "components/redux/reducer/CategoryReducer";
import {
  addCategory,
  addParentFood,
} from "components/redux/reducer/DirectorReducer";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

// Assets
import { FaExclamationTriangle } from "react-icons/fa";

const SubCategoryModal = ({
  subCategory = undefined, // for edit
  foodModal=undefined, onFoodShow=undefined, // for FoodModal
  show,
  onShow,
  onClose,
}) => {
  const userInfo = useSelector((state) => state.authenticationReducer.user);
  const userToken = useSelector((state) => state.authenticationReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allCategories = useSelector(
    (state) => state.categoryReducer.allCategories
  );
  // useEffect(() => {
  //   dispatch(retrieveAllCategories({}, navigate));
  // }, []);
  const { categoryId } = useParams();

  // Form handling
  const formSchema = Yup.object().shape({
    name: Yup.string().required(""),
    description: Yup.string().required(""),
    unit: Yup.string().required(""),
    category_id: Yup.number().required("").min(0),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  // Avatar
  const [image, setImage] = useState(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [showImage, setShowImage] = useState(false); // image modal
  const onCloseImage = () => {
    setShowImage(false);
    onShow();
  };
  const onShowImage = () => {
    setShowImage(true);
    onClose();
  };

  const onOpen = () => {
    if (subCategory) {
      reset({
        name: subCategory.name,
        description: subCategory.description,
        unit: subCategory.unit,
        category_id: categoryId ? categoryId : -1,
      });
    }
    onShow();
  };

  const onHide = () => {
    reset({
      name: "",
      description: "",
      unit: "kg",
      category_id: categoryId ? categoryId : -1,
    });
    setImage(undefined);
    onClose();
    if (foodModal) {
      onFoodShow();
    }
  };

  const onSubmit = (data) => {
    if (!image) return;

    dispatch(
      addParentFood(
        {
          name: data.name,
          description: data.description,
          image: image.split("base64,")[1],
          category_id: data.category_id,
          unit: data.unit,
          foodModal: foodModal
        },
        { userInfo, userToken },
        navigate
      )
    );

    setImage(undefined);
    setSubmitted(false);

    onHide();
  };

  // Edit handling
  useEffect(() => {
    if (subCategory) {
      setImage(`https://bachkhoi.online/static/${subCategory.image}`);
    } else {
      setImage(undefined);
    }
  }, [subCategory]);

  return (
    <>
      <Modal show={show} onShow={onOpen} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {subCategory ? "Chỉnh sửa" : "Thêm"} Hạng mục con
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="horizontal" className="mb-2" gap={4}>
              {image && (
                <img
                  src={image}
                  style={{ objectFit: "cover" }}
                  alt="category-img"
                  width="128"
                  height="128"
                />
              )}
              <Button variant="outline-secondary" onClick={onShowImage}>
                Đăng tải Ảnh Hạng mục con
              </Button>
            </Stack>
            {!image && submitted && (
              <p className="error">
                <FaExclamationTriangle className="mx-2" />
                Bạn chưa đăng tải ảnh
              </p>
            )}

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>
                Tên Hạng mục con
              </Form.Label>
              <Form.Control {...register("name")} />
              {errors.name && errors.name.type === "required" && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền tên Hạng mục con
                </p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Mô tả</Form.Label>
              <Form.Control {...register("description")} as="textarea" />
              {errors.description && errors.description.type === "required" && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền mô tả
                </p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Đơn vị</Form.Label>
              <Form.Select {...register("unit")}>
                <option value="kg">Kilogram</option>
                <option value="item">Cái</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Hạng mục</Form.Label>
              <Form.Select default-value={-1} {...register("category_id")}>
                <option value={-1}>-</option>
                {Object.keys(allCategories).length > 0 &&
                  allCategories.categories.map((category, idx) => (
                    <option value={category.id} key={idx}>
                      {category.name}
                    </option>
                  ))}
              </Form.Select>
              {errors.category_id && errors.category_id.type === "min" && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa chọn hạng mục
                </p>
              )}
            </Form.Group>

            <div className="d-grid">
              {!subCategory ? (
                <Button
                  className="fogi"
                  variant="primary"
                  type="submit"
                  onClick={() => setSubmitted(true)}
                >
                  Thêm Hạng mục
                </Button>
              ) : (
                <Button className="fogi" variant="primary">
                  Lưu thay đổi
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <CategoryImageModal
        showImage={showImage}
        onClose={onCloseImage}
        setImage={setImage}
      />
    </>
  );
};

export default SubCategoryModal;
