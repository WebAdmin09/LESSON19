import { Button, Card } from "antd";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  image: string;
  id: string;
  editCategory: (id: string) => void;
  deleteCategory: (id: string) => void;
}

const { Meta } = Card;

const CategoryCard = ({
  name,
  image,
  id,
  editCategory,
  deleteCategory,
}: CategoryCardProps) => {
  const editBtn = () => {
    editCategory(id);
  };

  const deleteBtn = () => {
    deleteCategory(id);
  };

  return (
    <Card
      hoverable
      cover={
        <img
          height={200}
          src={image}
          alt={name}
        />
      }
      style={{ margin: "10px" }}
    >
      <Meta title={name} style={{ marginBottom: "20px" }} />
      <Button onClick={editBtn}>Edit</Button>
      <Button danger onClick={deleteBtn}>
        Delete
      </Button>
      <Button>
        <Link to={`/product/${id}`}>Products</Link>
      </Button>
    </Card>
  );
};

export default CategoryCard;