import React, { useState } from "react";



const Search = ({product,products}) => {
console.log(product);
  const [searchtext, setSearchtext] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [resfound, setResfound] = useState(true);


  const handleChange = (e) => {
    let searchval = e.target.value;
    let suggestion = [];
    if (searchval.length > 0) {
      suggestion = product.name
        .sort()
        .filter((e) => e.toLowerCase().includes(searchval.toLowerCase()));
      setResfound(suggestion.length !== 0 ? true : false);
    }
    setSuggest(suggestion);
    setSearchtext(searchval);
  };

  const suggestedText = (value) => {
    console.log(value);
    setSearchtext(value);
    setSuggest([]);
  };

  const getSuggestions = () => {
    if (suggest.length === 0 && searchtext !== "" && !resfound) {
      return <p>Search Content Not Found</p>;
    }

    return (
      <ul>
        {suggest.map((item, index) => {
          return (
            <div key={index}>
              <li onClick={() => suggestedText(item)}>{item}</li>
              {index !== suggest.length - 1 && <hr />}
            </div>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="searchcontainer">
      <input
        type="text"
        placeholder="Search Products"
        className="search2"
        value={searchtext}
        onChange={handleChange}
      />
      {getSuggestions()}
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        name {
            current
        }
    }`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      name: product.name.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { name} }) => {
  const query = `*[_type == "product" && product.name`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);


  
  return {
    props: { product, products }, 
  };
};

export default Search;