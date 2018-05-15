package com.demo.model;

public class SpecialResponse {

    public enum TypeEnum {
        ERROR("ERROR"),

        SUCCESS("SUCCESS"),

        WARNING("WARNING");

        private String value;

        TypeEnum(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return String.valueOf(value);
        }
    }

    private TypeEnum type = null;

    private String message = null;

    private Object data = null;

    public SpecialResponse type(TypeEnum type) {
        this.type = type;
        return this;
    }

    public void setType(TypeEnum type) {
        this.type = type;
    }

    public SpecialResponse message(String message) {
        this.message = message;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public SpecialResponse data(Object data) {
        this.data = data;
        return this;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString() {

        return "class CustomResponse {\n" +
                "    type: " + toIndentedString(type) + "\n" +
                "    message: " + toIndentedString(message) + "\n" +
                "    data: " + toIndentedString(data) + "\n" +
                "}";
    }

    private String toIndentedString(java.lang.Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }
}