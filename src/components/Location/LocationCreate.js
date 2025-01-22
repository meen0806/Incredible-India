import React, { useState } from "react";


import {
  Create,
  SimpleForm,
  FileInput,
  FileField,
  SelectInput,
  TextInput,
  BooleanInput,
  useGetList,
} from "react-admin";

export const LocationCreate = () => {
  const { data: locations, isLoading } = useGetList("locations", {

    pagination: { page: 1, perPage:10 },
    sort: { field: "name", order: "ASC" },
    filter: {},
  });

  console.log("data",locations);

  const filteredParentLocation = locations?.filter(
    (location) => location.parent_id == null || location.parent_id == undefined || location.parent_id == ""
  );
  // const filteredParentLocation = locations?.filter(
  //   (location) => location.parent_id == null || location.parent_id == undefined || location.parent_id == ""
  // );
  
  console.log("filteredParentLocation",filteredParentLocation);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <Create>
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
    </Create>
  );
};
