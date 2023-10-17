import { Button, Card } from "antd";
import { ProductCardProps } from "../../types/product";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import './productCardstyle.css'

const { Meta } = Card;

const ProductCard = ({
    name,
    image,
    id,
    description,
    price,
    editProduct,
    deleteProduct,
}: ProductCardProps) => {
    const handleEdit = () => {
        editProduct(id);
    };

    const handleDelete = () => {
        deleteProduct(id);
    };

    return (
        <div className="product-card">
            <Card
                className="cardimg"
                hoverable
                cover={
                    <img
                        className="productimg"
                        height={200}
                        src={image}
                        alt={name}
                    />
                }
                style={{ margin: "10px" }}
            >
                <Meta title={name} style={{ marginBottom: "20px" }} />
                <h3>{price}$</h3>
                <h5>{description}</h5>
                <Button onClick={handleEdit} style={{marginLeft: '20px'}}>
                    <EditTwoTone />
                </Button>
                <Button danger onClick={handleDelete} style={{marginLeft: '20px'}}>
                    <DeleteTwoTone />
                </Button>
            </Card>
        </div>
    );
};

export default ProductCard;