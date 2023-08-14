import { useEffect, useState } from "react";
import FooterMenu from "../../components/FooterMenu";
import Header from "../../components/Header";
import { PageSC } from "../../style/PageLayout";
import axios from "axios";
import { requisitions } from "../../routes/routes";
import { Box, Input, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Select, Spinner, Text } from "@chakra-ui/react";
import ServiceCard from "./ServiceCard";
import debounce from "lodash.debounce";

export default function HomePage() {
    const [serviceParams, setServiceParams] = useState(undefined);
    const [services, setServices] = useState(undefined);
    const [isFirstSearch, setIsFirstSearch] = useState(true);

    const [formData, setFormData] = useState({
        searchQuery: '',
        priceRange: [1000, 5000],
        categoryFilter: '',
        regionFilter: '',
        state: '',
        city: ''
    });

    useEffect(() => {
        axios.get(requisitions.getAllParams)
            .then(resp => {
                setServiceParams(resp.data);
                setFormData(prevData => ({
                    ...prevData,
                    priceRange: [resp.data.minCost, resp.data.maxCost]
                }));
            })
            .catch(error => alert(error.response.data.message));

        axios.get(requisitions.getServices)
            .then(res => {
                setServices(res.data);
                setIsFirstSearch(false);
            })
            .catch(error => alert(error.response.data.message));
    }, []);

    const debouncedSearch = debounce((queryParams) => {
        axios.get(requisitions.getServices, { params: queryParams })
            .then(res => {
                console.log(res.data)
                setServices(res.data);
            })
            .catch(error => alert(error.response.data.message));
    }, 1000);

    function handleInputChange(e) {
        let newData;

        if (e?.target) {
            const { name, value } = e.target;
            newData = {
                ...formData,
                [name]: value
            }
        } else {
            newData = {
                ...formData,
                priceRange: e
            }
        }
        

        setFormData(newData);

        const queryParams = {
                    search: newData.searchQuery,
                    priceMin: Math.round(newData.priceRange[0]),
                    priceMax: Math.round(newData.priceRange[1]),
                    category: newData.categoryFilter,
                    city: newData.city,
                    state: newData.state
                };
        debouncedSearch(queryParams);
        console.log(queryParams)
    };

    return (
        <PageSC>
            <Header />
            {!services || !serviceParams && <Spinner size='xl' />}
            {services?.length === 0 || !services || !serviceParams ? (
                <h1>Ainda não temos serviços para mostrar.</h1>
            ) : (
                <>
                    <Box w="90vw" pb={4}>
                        <Text color="#000" fontSize="3xl" fontWeight="extrabold">
                            Todos os trampos:
                        </Text>
                        <Input
                            name="searchQuery"
                            placeholder="Pesquisar por nome ou descrição"
                            _placeholder={{ color: 'gray.400' }}
                            value={formData.searchQuery}
                            onChange={handleInputChange}
                            mt={2}
                        />

                        <RangeSlider
                            aria-label={['min', 'max']}
                            min={serviceParams.minCost / 100}
                            max={serviceParams.maxCost / 100}
                            step={1}
                            value={formData.priceRange}
                            onChange={handleInputChange}
                            mt={2}
                        >
                            <RangeSliderTrack>
                                <RangeSliderFilledTrack />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                            <RangeSliderThumb index={1} />
                        </RangeSlider>

                        <Box display="flex" justifyContent="space-between" >
                            <Text fontSize='md'>R$ {(formData.priceRange[0] / 100).toFixed(2)}</Text>
                            <Text fontSize='md'>R$ {(formData.priceRange[1] / 100).toFixed(2)}</Text>
                        </Box>

                        <Select
                            name='categoryFilter'
                            placeholder="Filtrar por categoria"
                            value={formData.categoryFilter}
                            onChange={handleInputChange}
                            mt={2}
                        >
                            {serviceParams.categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Select>
                        <Select
                            name="state"
                            placeholder="Filtrar por estado"
                            value={formData.state}
                            onChange={handleInputChange}
                            mt={2}
                        >
                            {serviceParams.locations.map((location) => (
                                <option key={location.name} value={location.name}>
                                    {location.name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            name="city"
                            placeholder="Filtrar por cidade"
                            value={formData.city}
                            onChange={handleInputChange}
                            mt={2}
                        >
                            {serviceParams.locations.find(location => location.name === formData.state)?.cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </Select>
                    </Box>
                    {services.map(service => <ServiceCard key={service.id} service={service} />)}
                </>
            )}
            <FooterMenu />
        </PageSC>
    )
}