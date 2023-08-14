import { useState, useEffect } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Checkbox,
    Select,
    Stack,
    InputLeftElement,
    Text,
    InputGroup,
    Image,
    Flex,
    Spinner,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import axios from 'axios';
import { headersAuth, pages, requisitions } from '../../routes/routes';
import { useNavigate } from 'react-router-dom';

export default function EditServiceForm({ service, id, user }) {
    const navigate = useNavigate();
    const [newId, setNewId] = useState(-1);
    const [formData, setFormData] = useState({
        meanCost: '',
        name: '',
        description: '',
        isVisible: false,
        category: '',
        images: [],
        mainImage: '',
        targetRegion: '',
    });
    const [isDisable, setIsDisable] = useState(false);

    useEffect(() => {
        if (service) {
            setFormData({
                meanCost: service.meanCost / 100,
                name: service.name,
                description: service.description,
                isVisible: service.isVisible,
                category: service.category,
                images: service.images,
                mainImage: service.mainImage,
                targetRegion: service.targetRegion,
            });
        }
    }, [service]);

    function handleInputChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAddUrl = () => {
        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, {id: newId, url: ''}]
        }));
        setNewId(newId - 1);
    };

    const handleUrlChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index].url = value;
        setFormData((prevData) => ({
            ...prevData,
            images: newImages,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDisable(true);
        const serviceData = { ...formData, meanCost: Math.round(formData.meanCost * 100) };
        serviceData.images = serviceData.images.filter(image => image.url !== '');

        axios.put(requisitions.updateService + id, serviceData, headersAuth(user.token))
            .then(res => {
                alert('Sucesso!');
                navigate(pages.myServices);
            })
            .catch(error => {
                alert(error.response.data.message);
                setIsDisable(false);
            })

    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Nome do serviço</FormLabel>
                    <Input
                        disabled={isDisable}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Descrição do serviço</FormLabel>
                    <Textarea
                        disabled={isDisable}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Custo médio</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            disabled={isDisable}
                            type="number"
                            name="meanCost"
                            value={formData.meanCost}
                            onChange={handleInputChange}
                        />
                        <InputLeftElement width='1rem' ml={4}>
                            <Text>
                                R$
                            </Text>
                        </InputLeftElement>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                        disabled={isDisable}
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                    >
                        {service.categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Área de cobertura</FormLabel>
                    <Select
                        disabled={isDisable}
                        name="targetRegion"
                        value={formData.targetRegion}
                        onChange={handleInputChange}
                    >
                        {service.targets.map((target) => (
                            <option key={target} value={target}>
                                {target}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Visibilidade</FormLabel>
                    <Checkbox
                        disabled={isDisable}
                        name="isVisible"
                        isChecked={formData.isVisible}
                        onChange={handleInputChange}
                    >
                        {formData.isVisible ? 'O serviço está visível' : 'O serviço não está visível'}
                    </Checkbox>
                </FormControl>

                <FormControl>
                    <FormLabel>Imagens</FormLabel>
                    {formData.images.map(({ id, url }, index) => (
                        <Flex flexDirection='column' justifyContent='center' mt={1} mb={5} key={id}>
                            <InputGroup size="md">
                                <Input
                                    disabled={isDisable}
                                    type="text"
                                    value={url}
                                    onChange={(e) => handleUrlChange(index, e.target.value)}
                                />
                            </InputGroup>
                            <Image
                                objectFit='cover'
                                w='300px'
                                h='200px'
                                src={url}
                                alt='Service image'
                                mt={2}
                            />
                        </Flex>
                    ))}
                    <Button size="sm" onClick={handleAddUrl} colorScheme="red" disabled={isDisable}>
                        <AddIcon/>
                    </Button>
                </FormControl>

                <FormControl>
                    <FormLabel>Imagem principal</FormLabel>
                    <Select
                        disabled={isDisable}
                        name="mainImage"
                        value={formData.mainImage}
                        onChange={handleInputChange}
                    >
                        {formData.images.map(({ id, url }, index) => (
                            <option key={id} value={url}>
                                Imagem {index + 1}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <Button type="submit" colorScheme="blue" disabled={isDisable}>
                    {isDisable ? (
                        <Spinner color='gray.500' />
                    ) : (
                        "Salvar alterações"
                    )}
                </Button>
            </Stack>
        </form>
    );
}
