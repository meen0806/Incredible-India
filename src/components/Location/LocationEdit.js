import { Edit,SimpleForm,TextInput,SimpleFormIterator, useGetList, BooleanInput, FileInput, FileField, SelectInput} from "react-admin";

export const LocationEdit = (props) => {
const { data: locations, isLoading } = useGetList("locations", {

    pagination: { page: 1, perPage:100 },
    sort: { field: "name", order: "ASC" },
    filter: {},
});


  if (isLoading) {
    return <span>Loading...</span>;
  }

  const filteredParentLocation = locations?.filter(
    (location) => location.parent_id == null || location.parent_id == undefined || location.parent_id == ""
  );

  return(
  <Edit {...props}>
      <SimpleForm>
            <TextInput source="name" label="Name of State/City" />
    
            <BooleanInput label="Favorite" source="favorite" />
    
            <BooleanInput label="Most Visited" source="most_visited" />
    
            <FileInput source="picture" label="Image" accept="image/*">
              <FileField source="src" title="title" />
            </FileInput>
    
            <SelectInput
              label="Parent Location"
              source="parent_id"
              choices={filteredParentLocation.map((location) => ({
                id: location.id,
                name: location.name,
              }))}
              optionText="name"
              optionValue="id"
              emptyText="No parent"
              
            />
          </SimpleForm>
  </Edit>
  )
};
