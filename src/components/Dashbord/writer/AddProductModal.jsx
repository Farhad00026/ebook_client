"use client";

import { addProduct } from "@/lib/actions/product";
import { authClient } from "@/lib/auth-client";
import { imageUploader } from "@/lib/imageupload";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

export function AddProductModal() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    // console.log(data);
    const image = await imageUploader(data.image)
    const result = await addProduct({ ...data, image: image.url,status:"Available",userId: user?.id });
    console.log(result);
  };

  return (
    <Modal>
      <Button variant="secondary">Add Ebbok</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Add Ebbok</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <TextField
                    className="w-full"
                    name="title"
                    type="text"
                    variant="secondary"
                  >
                    <Label>Title</Label>
                    <Input placeholder="Product Title" />
                  </TextField>
                   <TextField
                    className="w-full"
                    name="writerName"
                    type="text"
                    variant="secondary"
                  >
                    <Label>writerName</Label>
                    <Input placeholder="writer Name " />
                  </TextField>

                  <TextField
                    className="w-full"
                    name="description"
                    type="text"
                    variant="secondary"
                  >
                    <Label>Description</Label>
                    <Input placeholder="Description" />
                  </TextField>

                  <TextField
                    className="w-full"
                    name="price"
                    type="number"
                    variant="secondary"
                  >
                    <Label>Price</Label>
                    <Input placeholder="Price" />
                  </TextField>

                  <TextField
                    className="w-full"
                    name="genre"
                    type="text"
                    variant="secondary"
                  >
                    <Label>genre</Label>
                    <Input placeholder="Genre" />
                  </TextField>

                  <TextField
                    className="w-full"
                    name="coverImage"
                    type="file"
                    variant="secondary"
                  >
                    <Label>coverImage</Label>
                    <input name="image" type="file" placeholder="Image" />
                  </TextField>

                  <Modal.Footer>
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>
                    <Button type="submit" slot="close">
                      Add
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}