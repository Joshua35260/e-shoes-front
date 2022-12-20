import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Article = () => {
  let { id } = useParams();
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5002/shoes/${id}`)
      .then((res) => setShoes(res.data[0]));
  }, []);

 
    return (
      <div>
        {shoes.shoes_name}
        TTTTTTT
      </div>
    );
}

export default Article;
