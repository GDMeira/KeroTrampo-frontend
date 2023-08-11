import { useState, useEffect } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Checkbox,
    Select, // Adicione o componente Select
    Stack,
    InputLeftElement,
    Text,
    InputGroup,
} from '@chakra-ui/react';

function EditServiceForm({ service }) {
    const [formData, setFormData] = useState({
        meanCost: '',
        name: '',
        description: '',
        isVisible: false,
        category: '',
        url: [],
        targetRegion: '',
    });

    useEffect(() => {
        if (service) {
            setFormData({
                meanCost: service.meanCost / 100,
                name: service.name,
                description: service.description,
                isVisible: service.isVisible,
                category: service.category,
                url: service.url || [],
                targetRegion: service.targetRegion,
            });
        }
    }, [service]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAddUrl = () => {
        setFormData((prevData) => ({
            ...prevData,
            url: [...prevData.url, ''], // Adiciona uma URL vazia no final do array
        }));
    };

    const handleUrlChange = (index, value) => {
        const newUrls = [...formData.url];
        newUrls[index] = value;
        setFormData((prevData) => ({
            ...prevData,
            url: newUrls,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar o formData para a API para salvar as alterações
        // meanCost *= 100
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Nome do serviço</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Descrição do serviço</FormLabel>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Custo médio</FormLabel>
                    <InputGroup size='md'>
                        <Input
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
                    <FormLabel>Visível</FormLabel>
                    <Checkbox
                        name="isVisible"
                        isChecked={formData.isVisible}
                        onChange={handleInputChange}
                    >
                        O serviço está visível
                    </Checkbox>
                </FormControl>

                <FormControl>
                    <FormLabel>Imagens</FormLabel>
                    {formData.url.map((url, index) => (
                        <InputGroup key={index} size="md">
                            <Input
                                type="text"
                                value={url}
                                onChange={(e) => handleUrlChange(index, e.target.value)}
                            />

                        </InputGroup>
                    ))}
                    <Button size="sm" onClick={handleAddUrl}>
                        + Adicionar
                    </Button>
                </FormControl>

                <Button type="submit" colorScheme="blue">
                    Salvar alterações
                </Button>
            </Stack>
        </form>
    );
}

export default EditServiceForm;
