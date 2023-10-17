import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Row, Spin, Modal, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ProductCardProps } from '../types/product';
import { getProduct } from '../redux/slices/productSlice';
import request from '../server';
import { PlusCircleOutlined } from '@ant-design/icons';
import ProductCard from '../components/card/ProductCards';

const ProductPage = () => {
    const { products, loading } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const [selected, setSelected] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const showModal = () => {
        setSelected(null);
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleOk = async () => {
        try {
            const values: ProductCardProps = await form.validateFields();
            if (selected === null) {
                await request.post(`category/${id}/product`, values);
            } else {
                await request.put(`category/${id}/product/${selected}`, values);
            }
            closeModal();
            dispatch(getProduct(id));
        } catch (error) {
            console.log(error);
        }
    };

    const editProduct = async (productId: string) => {
        setSelected(productId);
        try {
            setIsModalOpen(true);
            const { data } = await request.get(`category/${id}/product/${productId}`);
            form.setFieldsValue(data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteProduct = async (productId: string) => {
        try {
            await request.delete(`category/${id}/product/${productId}`);
            dispatch(getProduct(id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='wrapper'>
            <Row justify="space-between">
                <h1>Products ({products.length})</h1>
                <Button onClick={showModal} className="primary">
                <PlusCircleOutlined />
                </Button>
            </Row>
            <Spin spinning={loading}>
                <Row gutter={8}>
                    {products.map((product) => (
                        <Col
                            key={product.id}
                            className="gutter-row"
                            xs={24}
                            sm={12}
                            md={8}
                            lg={6}
                        >
                            <ProductCard
                                {...product}
                                editProduct={() => editProduct(product.id)}
                                deleteProduct={() => deleteProduct(product.id)}
                            />
                        </Col>
                    ))}
                </Row>
            </Spin>
            <Modal
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={closeModal}
                title="Products"
            >
                <Form
                    form={form}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    autoComplete="off"
                >
                    <Form.Item<ProductCardProps>
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please fill!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<ProductCardProps>
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please fill!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<ProductCardProps>
                        label="Discount"
                        name="discount"
                        rules={[{ required: true, message: 'Please fill!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<ProductCardProps>
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please fill!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<ProductCardProps>
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please fill!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductPage;
