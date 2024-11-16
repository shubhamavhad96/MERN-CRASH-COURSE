import { useEffect } from 'react'
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard';
import { useProductStore } from '../store/product'; // Adjust the path as necessary

const HomePage = () => {

  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (

    // Currnt Products Section
    <Container 
        maxW="container.x1" py={12}>
          <VStack spacing={8}>
              <Text
                fontSize={"30"}
                fontWeight={"bold"}
                bgGradient={`linear(to-l, cyan.400, blue.500)`}
                bgClip={"text"}
                textAlign="center">

                Current Products

              </Text>

    {/* This is the grid component where we'll see products in a stylish manner */}

    <SimpleGrid 
      columns={{
        base: 1,
        md: 2,
        lg: 3
      }}
      spacing={10}
      w={'full'}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </SimpleGrid>



    {/* This is the section if we dont have any products in the store  */}

             {products.length === 0 && (
               <Text fontSize='xl' textAlign='center' fontWeight='bold' color='gray.500'>
                    No Products Found  {" "}
                    <Link to={"/create"}>
                        <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                          Create a product
                        </Text>
                    </Link>

                </Text>
             )}

          </VStack>
    </Container>
  )
}

export default HomePage