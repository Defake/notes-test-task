package com.defake.naunotes.dal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface NotesRepository extends JpaRepository<Note, Long> {
    @Modifying
    @Transactional
    @Query("update Note "
            + "set "
            + "title = :title, "
            + "content = :content "
            + "where id = :id")
    void updateById(Long id, String title, String content);

    @Modifying
    @Transactional
    @Query("delete from Note "
            + "where id = :id")
    void deleteById(Long id);

    @Query("select n from Note n "
            + "where lower(n.title)   like concat('%', lower(:query), '%')"
            + "   or lower(n.content) like concat('%', lower(:query), '%')")
    List<Note> getBySearchQuery(String query);

    List<Note> findAllByOrderByIdAsc();
}
