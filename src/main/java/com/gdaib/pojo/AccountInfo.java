package com.gdaib.pojo;

public class AccountInfo {
    private Integer id;

    private String username;

    private String name;

    private String mail;

    private String role;

    private String departmentId;

    private String depContent;

    private String professionId;

    private String content;

    private String uid;

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail == null ? null : mail.trim();
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role == null ? null : role.trim();
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepContent() {
        return depContent;
    }

    public void setDepContent(String depContent) {
        this.depContent = depContent == null ? null : depContent.trim();
    }

    public String getProfessionId() {
        return professionId;
    }

    public void setProfessionId(String professionId) {
        this.professionId = professionId == null ? null : professionId.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    @Override
    public String toString() {
        return "AccountInfo{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", mail='" + mail + '\'' +
                ", role='" + role + '\'' +
                ", departmentId='" + departmentId + '\'' +
                ", depContent='" + depContent + '\'' +
                ", professionId='" + professionId + '\'' +
                ", content='" + content + '\'' +
                ", uid='" + uid + '\'' +
                '}';
    }
}