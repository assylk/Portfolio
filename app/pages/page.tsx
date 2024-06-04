import axios from "axios";
export default async function getServerSideProps() {
  let data = await axios.get('https://api.ipregistry.co/?key=4t6mq9je2g3c5y8u').then((res) => {
    return res.data.location.country;
  }).catch((err) => {
    console.log(err);
  });
  console.log(data);
}